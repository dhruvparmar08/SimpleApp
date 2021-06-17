import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartdownloadComponent } from './cartdownload.component';

describe('CartdownloadComponent', () => {
  let component: CartdownloadComponent;
  let fixture: ComponentFixture<CartdownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartdownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
