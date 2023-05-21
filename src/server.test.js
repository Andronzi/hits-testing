const app = require("./server.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
let should = chai.should();

chai.use(chaiHttp);

describe("Basic endpoint", () => {
  it("GET / should show form", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("POST Requests with status 400 with problem of no args", () => {
  it("POST Form without data", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with empty object", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("POST Requests with status 400 with problem with one of args", () => {
  it("POST Form without piles", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "", h: 1 })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form without h", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "1 2 3", h: "" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with piles empty array", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: [], h: "5" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with h empty array", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "12 4 5 6", h: [] })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with piles empty object", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: {}, h: "213" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with h empty object", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "1 2 3 4", h: {} })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with piles nullable", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: null, h: "12" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with h nullable", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "1 2 3 4", h: null })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with piles undefined", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: undefined, h: "12" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with h undefined", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "1 2 3 4", h: undefined })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  // here we must not get 400
  it("POST Form with piles zero", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: 0, h: "12" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  // here we must not get 400
  it("POST Form with h zero", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "1 2", h: 0 })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it("POST Form with wrong piles", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "bhhb", h: 3 })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with wrong h", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "3", h: "hghghgh" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("POST Requests with status 400 with problem with both of args", () => {
  it("POST Form with piles empty array and h empty array", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: [], h: [] })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with piles empty array and h empty array", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: [], h: [] })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with piles, h empty strings", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "", h: "" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with piles, h empty objects", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: {}, h: {} })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with piles, h nullables", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: null, h: null })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("check that answer in the neighborhood with 1", () => {
  const piles = [30, 11, 23, 4, 20];
  const h = piles.reduce((p, c) => p + c, 0);

  // [basicPilesArray, arraySum, 1],
  //   [basicPilesArray, arraySum + 1, 1],
  //   [basicPilesArray, arraySum + 10000, 1],
  //   [basicPilesArray, arraySum - 1, 2];

  it("piles sum equals h", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: piles.join(" "),
        h: h,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(1);
        done();
      });
  });

  it("h more than piles sum by one", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: piles.join(" "),
        h: h + 1,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(1);
        done();
      });
  });

  it("h more than piles sum", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: piles.join(" "),
        h: h + 10000,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(1);
        done();
      });
  });

  it("piles sum more than h by one", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: piles.join(" "),
        h: h - 1,
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(2);
        done();
      });
  });
});

// [[3, 6, 7, 11], 8, 4],
//         [[30, 11, 23, 4, 20], 8, 15],
//         [[30, 11, 23, 4, 20], 12, 10],
//         [[30, 11, 23, 4, 20], 13, 8]

describe("Basic endpoints", () => {
  it("Usual test1 of result", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "3 6 7 11",
        h: "8",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(4);
        done();
      });
  });

  it("Usual test2 of result", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "30 11 23 4 20",
        h: "8",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(15);
        done();
      });
  });

  it("Usual test3 of result", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "30 11 23 4 20",
        h: "12",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(10);
        done();
      });
  });

  it("Usual test4 of result", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "30 11 23 4 20",
        h: "13",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(8);
        done();
      });
  });
});

describe("Not found request, unused methods", () => {
  it("POST Form to wrong url", (done) => {
    chai
      .request(app)
      .post("/wrong-url")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "1 2 3 4",
        h: "3",
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("Form using an unprocessed method", (done) => {
    chai
      .request(app)
      .put("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "1 2 3 4",
        h: "3",
      })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });

  it("Form using an unprocessed method", (done) => {
    chai
      .request(app)
      .delete("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "1 2 3 4",
        h: "3",
      })
      .end((err, res) => {
        res.should.have.status(405);
        done();
      });
  });
});

describe("POST Requests with internal server errors", () => {
  it("POST Form with h less than piles", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "1 2 3 4",
        h: "3",
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it("POST Form with h > 1_000_000_000", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "1 2 3 4",
        h: "1000000001",
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it("POST Form with pile less than 1", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "0 1 2",
        h: "5",
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it("POST Form with pile less than 1", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "1000000001 1 2",
        h: "5",
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
