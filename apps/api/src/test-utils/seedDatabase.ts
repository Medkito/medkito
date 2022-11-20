import { Diagnostic } from "../entity/Diagnostic";
import { Medicament } from "../entity/Medicament";
import { Specialty } from "../entity/Specialty";
import connectToDB from "../utils/connectToDB";
var fs = require("fs");
var parse = require("csv-parse");

var medicamenteParser = parse({ columns: true }, async (err, records) => {
  let promises = [];

  records.forEach((element) => {
    promises.push(addMedicament(element));
  });

  await Promise.all(promises);
});

var diagnosticeParser = parse({ columns: true }, async (err, records) => {
  let promises = [];

  records.forEach((element) => {
    promises.push(addDiagnostic(element));
  });

  await Promise.all(promises);
});

var specialitatiParser = parse({ columns: true }, async (err, records) => {
  let promises = [];

  records.forEach((element) => {
    promises.push(addSpecialty(element));
  });

  await Promise.all(promises);
});

const addDiagnostic = async (record) => {
  const { name, code } = record;

  const diagnostic = new Diagnostic();
  diagnostic.name = name;
  await diagnostic.save();
};

const addMedicament = async (record) => {
  const { name, code } = record;

  const medicament = new Medicament();
  medicament.name = name;
  await medicament.save();
};

const addSpecialty = async (record) => {
  const { name } = record;

  const specialty = new Specialty();
  specialty.denumire = name;
  await specialty.save();
};

const seedDatabase = async () => {
  await connectToDB();

  console.log("Seeding database...");
  fs.createReadStream(__dirname + "/data/medicamente.csv").pipe(
    medicamenteParser
  );
  fs.createReadStream(__dirname + "/data/diagnostice.csv").pipe(
    diagnosticeParser
  );
  fs.createReadStream(__dirname + "/data/specialitati.csv").pipe(
    specialitatiParser
  );
};

seedDatabase();
