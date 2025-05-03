import { Component, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      surname: [data?.surname || '', Validators.required],
      phone: [data?.phone || '', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],
      address: [data?.address || '', Validators.required],
      city: [data?.city || '', Validators.required],
      zipCode: [data?.zipCode || '', Validators.required]
    });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      console.warn('Formulario inválido', this.form);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
