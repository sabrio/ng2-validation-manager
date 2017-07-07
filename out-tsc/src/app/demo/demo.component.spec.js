import { async, TestBed } from '@angular/core/testing';
import { DemoComponent } from './demo.component';
describe('DemoComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DemoComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/xampp/htdocs/ng2-validation-manager/src/src/app/demo/demo.component.spec.js.map