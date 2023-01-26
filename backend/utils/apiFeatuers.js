class ApiFeatuers {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    // console.log("kwyword", keyword);
    //    console.log("{..kwyord}" ,{...keyword})

    return this;
  }
 


  filter() {
    const queryCopy = { ...this.queryStr };
    /// remove fileds for catefory
    const removeFields = ["keyword", "page", "limit"];
    //  console.log("bedore reomving queryCopy", queryCopy)

    removeFields.forEach((key) => delete queryCopy[key]);

    //  console.log("after reomving queryCopy", queryCopy)
    let querystr = JSON.stringify(queryCopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    querystr = JSON.parse(querystr);
    // console.log("after reomving querystr after regualar expression", querystr);

    this.query = this.query.find(querystr);
    return this;
  }
  fikter2(){
    const querycopy  = {...this.querystre}
    
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //50-10
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatuers;
