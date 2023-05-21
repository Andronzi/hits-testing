const app = require("./server.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
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

describe("Basic endpoints", () => {
  it("POST Form", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({
        piles: "1 2 3 4",
        h: "5",
      })
      .end((err, res) => {
        err.should.be.null;
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a("object");
        res.body.should.have.property("result");
        res.body.result.should.be.equal(3);
        done();
      });
  });

  it("POST Form with piles number", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: 1, h: "5" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.result.should.be.equal(1);
        done();
      });
  });
});

describe("POST Requests with status 400", () => {
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

  it("POST Form with piles has word chars", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "asd", h: "123" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("POST Form with h has word chars", (done) => {
    chai
      .request(app)
      .post("/")
      .set("content-type", "application/x-www-form-urlencoded")
      .send({ piles: "1 2 3 4", h: "fa" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

// it("POST Form with wrong h", (done) => {
//   chai
//     .request(app)
//     .post("/")
//     .set("content-type", "application/x-www-form-urlencoded")
//     .send({
//       piles: "1 2 3 4",
//       h: "3",
//     })
//     .end((err, res) => {
//       res.should.have.status(500);
//       done();
//     });
// });
