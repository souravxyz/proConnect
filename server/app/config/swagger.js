import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const setupSwaggerDocs = (app) => {
  const swaggerFilePath = path.join(process.cwd(), "app/docs/swagger.yaml");

  try {
    const swaggerDocument = yaml.load(fs.readFileSync(swaggerFilePath, "utf8"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("✅ Swagger docs available at /api-docs");
  } catch (error) {
    console.error("Failed to load Swagger docs:", error.message);
  }
};

export default setupSwaggerDocs;
