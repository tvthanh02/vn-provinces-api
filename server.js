const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(cors());
server.use(jsonServer.bodyParser);

server.get("/provinces", (req, res) => {
  const provinces = router.db.get("provinces").value();

  if (!provinces) {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.json(provinces);
  }
});

server.get("/districts/:provinceId", (req, res) => {
  const { provinceId } = req.params;
  const districts = router.db
    .get("districts")
    .filter({ provinceId: provinceId })
    .value();
  if (!districts) {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.json(districts);
  }
});

server.get("/villages/:districtId", (req, res) => {
  const { districtId } = req.params;
  const villages = router.db
    .get("villages")
    .filter({ districtId: districtId })
    .value();
  if (!villages) {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.json(villages);
  }
});

server.listen(port, () => {
  console.log(`Port ${port} is listening....`);
});
