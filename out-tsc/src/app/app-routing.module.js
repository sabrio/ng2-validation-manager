import { RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { DemoComponent } from "./demo/demo.component";
var routes = [
    {
        path: '',
        component: HomeComponent,
    }, {
        path: 'demo',
        component: DemoComponent
    }
];
export var routing = RouterModule.forRoot(routes, { useHash: false });
//# sourceMappingURL=C:/xampp/htdocs/ng2-validation-manager/src/src/app/app-routing.module.js.map