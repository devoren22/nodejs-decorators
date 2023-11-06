import { Service } from "typedi";
import { Body, Controller, Get, Param, Post } from "../../express";
import { ExampleService } from "../services/example.service";
import { AppConfiguration, ConfigService } from "../../configuration/configuration";

@Controller("/example")
@Service()
export class ExampleController {
  constructor(
    private readonly _exampleService: ExampleService,
    private readonly _configService: ConfigService<AppConfiguration>
  ) {}

  @Get("/check/:value")
  async check(@Param("value") val: string) {
    console.log(val);

    return { val: `${this._exampleService.check()} -> ${val}`, config: this._configService.get("port") };
  }

  @Post("/check")
  async addCheck(
    @Body() body: { firstName: string; lastName: string },
    @Body("firstName") firstNameAgain: string,
    @Body("lastName") lastNameAgain: string
  ) {
    const { firstName, lastName } = body;

    return `${firstName} ${lastName} ${firstNameAgain} ${lastNameAgain}`;
  }
}
