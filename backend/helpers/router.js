/**
 * Path2Regexp string expressions && validators
 */
module.exports = {
  PARAMS: {
    /**
     * @description Check for ObjectId hex string
     */
    ID: ':id([0-9a-fA-F]{24})',
  },
  QUERIES: {
    /**
     * Query param "id" handler function
     * @param {String|Number} id - query param value
     * @description Function defined to handle process of validation for dedicated query param.
     *              In case of "id" param => value checking for existence and safe integer definition
     *              (9 digits which in total give us number less then max. safe integer)
     * @returns {Number|Null|Undefined}
     * @description Function result equals:
     *              => Number - in case if it's value is valid & parsed
     *              => Null - in case if it's value is invalid
     *              => Undefined - in case if it's value is not defined
     *              Such strategy allow us to return different status codes on API requests
     *
     */
    ID_HANDLER: (id) => {
      // query param is not defined =>
      // no additional checking needed
      if (typeof id === 'undefined') {
        return undefined;
      }
      // otherwise =>
      // regex integer basic match validation (positive integer in range of 9 digits, which didn't start with zero)
      const matched = /^[1-9]\d{0,8}$/.test(String(id));
      // if integer is matched => parse it
      const parsed = (matched && Number.isInteger(+id) && Number.parseInt(String(id), 10)) || null;
      return parsed;
    },

    /**
     * Query param "page" handler function
     * @param {String|Number} page - query param value
     * @description Function defined to handle process of validation for dedicated query param.
     *              In case of "page" param => value checking for existence and safe integer definition
     *              (9 digits which in total give us number less then max. safe integer)
     * @returns {Number|Null|Undefined}
     * @description Function result equals:
     *              => Number - in case if it's value is valid & parsed
     *              => Null - in case if it's value is invalid
     *              => Undefined - in case if it's value is not defined
     *              Such strategy allow us to return different status codes on API requests
     *
     */
    PAGE_HANDLER: (page) => {
      switch (typeof page) {
        case 'undefined': {
          // query param is not defined =>
          // no additional checking needed
          return undefined;
        }
        // default or already parsed value
        case 'number':
          if (page > 0 && page < 247483647) {
            return page;
          }
          break;

        default: {
          // otherwise =>
          // regex integer basic match validation (positive integer in range of 9 digits, which didn't start with zero)
          const matched = /^[1-9]\d{0,8}$/.test(page);
          // if integer is matched => parse it
          const parsed = (matched && Number.isInteger(+page) && Number.parseInt(page, 10)) || null;
          return parsed;
        }
      }
    },
  },
};
