import fs from "fs";
import fss from "fs/promises";
import express, { Request, Response, NextFunction } from "express";

const pathOfData = "Database/dataBase.json";
console.log(pathOfData);
let isExit = fs.existsSync(pathOfData);

if (!isExit) {
  async function createFileImmediately() {
    try {
      await fss.writeFile(pathOfData, JSON.stringify([]));
    } catch (err) {
      console.error("Error occured while reading directory!", err);
    }
  }
  createFileImmediately();
}

// if (!isExit) {
//   fs.writeFileSync(pathOfData, JSON.stringify([]));
// }

let dB = JSON.parse(fs.readFileSync(pathOfData, "utf8"));

// const result = []
// let dB = fs.readFile(`${__dirname}/../Database/dataBase.json`,(err, data) => {
//     if(err){
//         console.log(err)
//     }
// })

// let dataBase =  fss.readFile(pathOfData, "utf8");

// const readFile = async ()=> {
//   try {
//     const data =  fss.readFile(pathOfData, "utf8")
// return data
//   }
//   catch(err) {
//     console.log(err)
//   }
// }

interface DataBaseObject {
  organization: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  id: number;
  noOfEmployees: number;
  employees: string[];
}

export const getAll = (req: Request, res: Response) => {
  res.status(200).json({
    status: "succes",
    result: dB.length,
    data: {
      dB,
    },
  });
};

export const getSingle = (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const singleDb = dB.find((el: DataBaseObject) => el.id === id);
  res.status(200).json({
    status: "succes",
    data: {
      singleDb,
    },
  });
};

export const createData = (req: Request, res: Response) => {
  let id;
  if (dB.length == 0) {
    id = 1;
  } else {
    id = dB[dB.length - 1].id + 1;
  }
  const newObj = Object.assign(
    req.body,
    { createdAt: new Date().toISOString() },
    { updatedAt: new Date().toISOString() },
    { id: id }
  );

  dB.push(newObj);
  fs.writeFile(pathOfData, JSON.stringify(dB, null, 3), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        new: newObj,
      },
    });
  });
};

export const updateData = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const index = dB.findIndex((p: DataBaseObject) => p.id === id);

  let sample = {
    ...dB[index],
    ...req.body,
    id,
    updatedAt: new Date().toISOString(),
  };
  dB[index] = sample;
  fs.writeFile(pathOfData, JSON.stringify(dB, null, 3), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        updated: sample,
      },
    });
  });
};

export const deleteData = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  dB = dB.filter((el: DataBaseObject) => el.id !== id);
  fs.writeFile(pathOfData, JSON.stringify(dB, null, 3), (err) => {
    res.status(201).json({
      status: "success",
      msg: "succesfully removed",
    });
  });
};

//Creating Middleware for wrong ID
export const checkID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = Number(req.params.id);
  if (!dB.some((el: DataBaseObject) => el.id === id)) {
    return res.status(404).json({
      status: "failed",
      msg: "invalid ID",
    });
  }
  next();
};

//middleware for validation
export const validation = (req: Request, res: Response, next: NextFunction) => {
  if (
    typeof req.body.organization !== "string" ||
    !Array.isArray(req.body.products) ||
    typeof req.body.address !== "string" ||
    typeof req.body.marketValue !== "string" ||
    typeof req.body.ceo !== "string" ||
    typeof req.body.country !== "string" ||
    typeof req.body.noOfEmployees !== "number" ||
    !Array.isArray(req.body.employees) ||
    typeof req.body.createdAt !== "string" ||
    typeof req.body.updatedAt !== "string" ||
    typeof req.body.id !== "number"
  ) {
    return res.status(404).json({
      status: "failed",
      msg: "Please input valid details",
    });
  }
  next();
};
