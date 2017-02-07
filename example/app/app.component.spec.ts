import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      providers: []
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.url).toEqual('https://github.com/sabrio/ng2-validation-manager');
  });

});
