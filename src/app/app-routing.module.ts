import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DemoComponent} from "./demo/demo.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },{
    path: 'demo',
    component: DemoComponent
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: false});
