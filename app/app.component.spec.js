"use strict";
////////  SPECS  /////////////
// describe('AppComponent with TCB', function () {
//   it('should instantiate component',
//     async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
//     tcb.createAsync(AppComponent).then(fixture => {
//       expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
//     });
//   })));
//   it('should have expected <h1> text',
//     async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
//       tcb.createAsync(AppComponent).then(fixture => {
//       // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding
//       let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works
//           h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred
//       expect(h1.innerText).toMatch(/angular 2 app/i, '<h1> should say something about "Angular 2 App"');
//     });
//   })));
// });
//# sourceMappingURL=app.component.spec.js.map