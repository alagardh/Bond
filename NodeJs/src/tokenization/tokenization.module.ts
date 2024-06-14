import { Module } from "@nestjs/common";
import { TokenizationContoller } from "./tokenization.controller";
import { TokenizationService } from "./tokenization.service.";
import { EthereumInitialize } from "./ethereumInitialize";
import { ExerciseTemplate } from "src/daml/exercise-template";
import { CreateTemplates } from "src/daml/create_template";

@Module({
  
   controllers:[TokenizationContoller],
  providers: [TokenizationService, EthereumInitialize, ExerciseTemplate,CreateTemplates],
})
export class TokenizationModule {
  
}
