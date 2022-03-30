import fs from "fs";
import fss from "fs/promises";
import express, { Request, Response, NextFunction } from "express";

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

const pathOfData = "Database/dataBase.json";

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

const reader = async () => {
  let dB: string = "";
  try {
    dB = await fss.readFile(pathOfData, { encoding: "utf-8" });
  } catch (err) {
    dB = JSON.stringify([]);
  }
  return JSON.parse(dB);
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const dB = await reader();
    res.status(200).json({
      status: "succes",
      data: {
        dB,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingle = async (req: Request, res: Response) => {
  try {
    const dB = await reader();
    const id: number = Number(req.params.id);
    const singleDb = dB.find((el: DataBaseObject) => el.id === id);
    res.status(200).json({
      status: "succes",
      data: {
        singleData: singleDb,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createData = async (req: Request, res: Response) => {
  try {
    const dB = await reader();
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
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (req: Request, res: Response) => {
  try {
    const dB = await reader();
    const id: number = Number(req.params.id);
    const index = dB.findIndex((p: DataBaseObject) => p.id === id);

    let sample = {
      ...dB[index],
      ...req.body,
      createdAt: dB[index].createdAt,
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
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (req: Request, res: Response) => {
  try {
    let dB = await reader();
    const id: number = Number(req.params.id);
    dB = dB.filter((el: DataBaseObject) => el.id !== id);
    fs.writeFile(pathOfData, JSON.stringify(dB, null, 3), (err) => {
      res.status(201).json({
        status: "success",
        msg: "succesfully removed",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//Creating Middleware for wrong ID
export const checkID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dB = await reader();
    const id: number = Number(req.params.id);
    if (!dB.some((el: DataBaseObject) => el.id === id)) {
      return res.status(404).json({
        status: "failed",
        msg: "invalid ID",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
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
