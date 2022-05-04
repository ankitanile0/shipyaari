import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrComponent } from './toastr.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ToastrComponent],
    exports: [ToastrComponent]
})
export class ToastrModule { }