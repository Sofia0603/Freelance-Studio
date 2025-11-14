import {HttpUtils} from "../../utils/http-utils";
import {FileUtils} from "../../utils/file-utils";

export class OrdersCreate {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    $('#calendar-scheduled').datetimepicker({
      format: 'L',
      inline: true
    })
  }

}