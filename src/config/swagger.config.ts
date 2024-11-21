import * as YAML from "yamljs";
import * as path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const spec = path.join(__dirname, "../../api.yaml");
const apiSpec = YAML.load(spec);

const options: swaggerJsdoc.Options = {
  swaggerDefinition: apiSpec,
  apis: ["**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);