import { Service } from "typedi";

@Service()
export class ExampleService {
  check() {
    return "Ok";
  }
}
