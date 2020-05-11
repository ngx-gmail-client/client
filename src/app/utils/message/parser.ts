import {Message} from '../../models/message';
import * as _ from 'lodash';

export class Parser {

  /**
   * Message mime type
   */
  mimeType: string = null;

  /**
   * Content of message. Default we are search voor text/html not text/plain
   */
  content: string = null;

  /**
   * @param payload
   */
  constructor(private payload: object) {

    this.mimeType = _.get(this.payload, 'mimeType', null);
    this.init();

  }

  getContent(): string {
    return this.content;
  }

  init(): void {

    if(_.has(this.payload['body'], 'data')){

      const body = this.decode(_.get(this.payload['body'], 'data'));
      this.content = this.stripHtml('<pre>' + body + '</pre>');

      return;
    }

    switch (this.mimeType) {

      case 'text/html' : {

        const body = this.decode(_.get(this.payload['body'], 'data', null));

        if (body.indexOf('<body') !== -1) {
          this.content = this.stripHtml(body);
        } else {
          this.content = body;
        }

        break;
      }

      case 'multipart/alternative' : {

        const entity = this.findHtmlPart(_.get(this.payload, 'parts'));

        if (entity) {
          const body = this.decode(entity);
          this.content = this.stripHtml(body);
        }

        break;
      }

      case 'multipart/mixed' :
      case 'multipart/related' : {

        const entity = this.findHtmlPart(_.get(this.payload, 'parts'));

        if (entity) {
          const body = this.decode(entity);
          this.content = this.stripHtml(body);
        }

        break;
      }
    }
  }

  /**
   * Find the html part which can be in several places
   * @param sources
   */
  findHtmlPart(sources): string {

    let entity = _.find(sources, {mimeType: 'text/html'});

    if (entity) {

      return _.get(entity.body, 'data');

    } else {

      entity = _.find(sources, {mimeType: 'multipart/alternative'});

      if (entity) {
        return this.findHtmlPart(_.get(entity, 'parts'));
      }
    }
  }

  /**
   * Extract the body form the source code. We don't headers etc.
   * @param source
   */
  stripHtml(source: string): string {

    const start = source.indexOf('<body');

    if(start !== -1){

      const end = source.indexOf('</body>');

      const body = source.substring(start, end);
      const bodyTag = body.indexOf('>');

      return body.substring(bodyTag + 1, body.length);
    } else {
      return source;
    }
  }

  /**
   * Decode the base encoded string.
   * @param source
   */
  decode(source: string): string {
    return this.b64DecodeUnicode(source.replace(/-/g, '+').replace(/_/g, '/'));
  }

  /**
   * The "Unicode Problem" Since DOMStrings are 16-bit-encoded strings, in most browsers calling window.btoa on a Unicode string
   * will cause a Character Out Of Range exception if a character exceeds the range of a 8-bit byte (0x00~0xFF).
   * @see https://stackoverflow.com/users/1214800/brandonscript (thanks)
   */
  b64DecodeUnicode(str) {

    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
