class APIFeatures {
  constructor(query, queryObject) {
    this.query = query;
    this.queryObject = queryObject;
  }

  filter() {
    // exclude fields so that they're not included in the query
    const queryObject = { ...this.queryObject };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObject[el]);

    // advanced filtering with operators
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g, // b -> exact match; g -> every occurence not just first
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryObject.sort) {
      const sortBy = this.queryObject.sort.split('+').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('name');
    }
    return this;
  }

  limitFields() {
    if (this.queryObject.fields) {
      const fields = this.queryObject.fields.split('+').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryObject.page * 1 || 1;
    const limit = this.queryObject.limit * 1 || 4;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
