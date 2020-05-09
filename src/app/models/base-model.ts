import * as dt from 'date-fns';
import * as _ from 'lodash';

export class BaseModel {

  /**
   * Id-number coresponding with record / object id
   */
  public id: any = null;

  /**
   * set The resource name
   */
  constructor() {
    this.setResourceType();
  }

  /**
   * Somtimes you have an array which do not contain child objects or wanna be child objects.
   * You can add the property to this array and the system won't look for any relations.
   * @return {any[]}
   */
  arrays(): any[] {
    return [];
  }

  /**
   * List of values which will be converted to booleans
   * @return {any[]}
   */
  booleans(): any[] {
    return [];
  }

  /**
   * List of values which will be converted to Date object
   * @return {any[]}
   */
  dates(): any[] {
    return [];
  }

  /**
   * List of values which will be converted to integers
   * @return {any[]}
   */
  integers(): any[] {
    return [];
  }

  /**
   * Define the relationships of this entity. The key of the returned object must correspond to a property of this object.
   * If the property of this entitie is an array, the relation will be pushed to the collection.
   * @return {object}
   */
  relationships(): object {
    return {};
  }


  /**
   * Set the initial properties of the entity including it's relation(s)
   * @param properties
   */
  setProperties(properties: any): void {

    for (const property in properties) {

      if (properties.hasOwnProperty(property)) {

        if (properties[property] === null) {

          this[property] = null;

        } else if (Object.getOwnPropertyNames(this).indexOf(property) !== -1) {

          if (!(typeof properties[property] === 'object')) {

            if (this.dates().indexOf(property) !== -1 && typeof properties[property] === 'string') {


              const date = dt.parseISO(properties[property]);
              this[property] = dt.addMinutes(date, date.getTimezoneOffset() * -1);

            } else if (this.booleans().indexOf(property) !== -1) {

              this[property] = properties[property] === '1' || properties[property] === 1 || properties[property] === true ||
                properties[property] === 'true';

            } else if (this.integers().indexOf(property) !== -1 ) {

              this[property] = parseInt(properties[property], 0);

            } else {
              this[property] = properties[property];

            }
          } else if (this.arrays().indexOf(property) !== -1) {
            this[property] = properties[property];
          } else {
            this.addRelation(property, properties[property]);
          }
        }
      }
    }
  }

  /**
   * Add an relation to the entity.
   * @param {string} name
   * @param {object} properties
   */
  addRelation(name: string, properties: object): void {

    const relations = this.relationships();

    if (relations.hasOwnProperty(name)) {

      if (this.hasOwnProperty(name)) {

        if (Array.isArray(this[name]) && Array.isArray(properties)) {

          properties.forEach((entity) => {
            this[name].push(new relations[name](entity));
          });

        } else {
          this[name] = new relations[name](properties);
        }
      }
    } else {
      /* property is an array, but not an relation */
      this[name] = properties;
    }
  }

  /**
   * Returns the classname in lower case at runtime
   */
  setResourceType(): void {

    const className = this.constructor.name;

    if (className !== null) {

      Object.defineProperty(this, 'resourceType', {
        writable: true,
        configurable: true,
        enumerable: false,
        value: className.toLowerCase()
      });
    }
  }

  /**
   * Return the simple attributes of the model (strings, booleans & numbers etc) Forget all null values and additional properties
   * Used for persentations transformers only
   * @param {boolean} deep Including the relations
   * @return {{}}
   */
  getBaseAttributes(deep: boolean = false): object {

    const attributes = {};

    Object.keys(this).forEach((key) => {

      if (key === 'id' || key === 'uniqueId') {
        return;
      }

      const property = this[key];
      let value;

      if (property instanceof Date) {

        value = dt.format(property, 'yyyy-MM-dd');

      } else if (_.isString(property) || _.isNumber(property) || _.isBoolean(property)) {

        value = property;

      } else if (deep === true && property !== null && typeof property === 'object' && property.hasOwnProperty('modelService')) {

        value = property.getBaseAttributes();
      }

      if (value !== undefined) {

        Object.defineProperty(attributes, key, {
          writable: true,
          configurable: true,
          enumerable: true,
          value
        });
      }

    });

    return attributes;
  }

  /**
   * When persisting relations between models, the backend needs an array like to synchronise
   *
   * [{
   *     id: 4
   *     start_date: '2014-01-01
   * }]
   *
   * The backend wil sync the relations. In some cases the crosstable has some additional fields
   * which can be attached by using the `include ` parameter.
   *
   * @param relation
   * @param pivot
   */
  getRelationAttributes<T extends BaseModel>(relation: string, pivot?: string[]): { relations: T[] } {

    const entities = [];

    if (this.hasOwnProperty(relation) && Array.isArray(this[relation])) {

      this[relation].forEach((entity) => {

        const property = {};

        Object.defineProperty(property, 'id', {
          enumerable: true,
          value: entity.id
        });

        if (Array.isArray(pivot)) {

          pivot.forEach((p) => {

            if (entity.hasOwnProperty(p)) {

              let value = entity[p];

              if (entity[p] instanceof Date) {
                value = dt.format(entity[p], 'yyyy-MM-dd');
              }

              Object.defineProperty(property, p, {
                enumerable: true,
                value
              });
            }
          });
        }

        entities.push(property);
      });
    }

    return {
      relations: entities
    };
  }

  /**
   * check if the entiy has an id which als exists in the collection.
   * The entity can be a number or an object with an id property
   * @param collection
   * @param entity
   */
  exists<T extends BaseModel>(collection: T[], entity: any): boolean {

    if (!Array.isArray(collection) || (typeof entity !== 'number' && !entity.hasOwnProperty('id'))) {
      return false;
    }

    let id: number;
    let hasChild = false;

    typeof entity === 'object' && (entity.hasOwnProperty('id') && entity.id !== null) ? id = entity.id : id = entity;

    collection.forEach((item) => {

      if (item.hasOwnProperty('id') && item.id === id) {
        hasChild = true;
      }
    });

    return hasChild;
  }

  /**
   * Remove an item from the collection. The entity can be an object or a number
   * @param collection
   * @param entity
   */
  remove<T extends BaseModel>(collection: T[], entity: any): Array<T> | boolean {

    if (!Array.isArray(collection) || (typeof entity !== 'number' && !entity.hasOwnProperty('uniqueId'))) {
      return false;
    }

    let identifier: string | T;

    typeof entity === 'object' ? identifier = entity.uniqueId : identifier = entity;

    const index = _.findIndex(collection, (o) => {
      return !o.hasOwnProperty('uniqueId') ? false : o.uniqueId === identifier;
    });

    if (index !== -1) {
      collection.splice(index, 1);
    }

    return collection;
  }

  /**
   * Angular has problems with detecting deep nested changes. So we clone the collection to force angular
   * to see the changes. Not nice but it works
   *
   * @param propertyName
   * @param entity
   */
  appendChild<T extends BaseModel>(propertyName: string, entity: T): void {

    if (this.hasOwnProperty(propertyName) && Array.isArray(this[propertyName])) {

      const collection = _.cloneDeep(this[propertyName]);
      collection.push(entity);

      this[propertyName] = collection;
    }
  }

  /**
   * Check if the given model has any relations with a value. In other words check if all relations are empty
   * Exclude the property with the given name
   *
   * @param entity
   * @param exclude
   */
  hasRelations<T extends BaseModel>(entity: T, exclude?: string[]): boolean {

    let related = false;
    const relationships = entity.relationships();

    (_.keys(relationships)).forEach((key) => {

      if (exclude !== undefined && exclude.indexOf(key) !== -1) {
        return;
      }

      const value = this[key];

      if ((Array.isArray(value) && value.length >= 1) || (!Array.isArray(value) && value !== null)) {
        related = true;
      }
    });

    return related;
  }
}
