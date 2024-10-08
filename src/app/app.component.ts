import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bmiForm: FormGroup;
  bmiResult: number | null = null;

  constructor(private fb: FormBuilder) {
    this.bmiForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]]
    });
  }

  calculateBMI(): void {
    const weight = this.bmiForm.value.weight;
    const heightInCm = this.bmiForm.value.height;
    const heightInMeters = heightInCm / 100;

    if (weight && heightInMeters) {
      this.bmiResult = weight / (heightInMeters * heightInMeters);
    }
  }

  getBmiCategory(): string {
    if (this.bmiResult === null) return '';

    if (this.bmiResult < 18.5) {
      return 'Underweight';
    } else if (this.bmiResult >= 18.5 && this.bmiResult < 24.9) {
      return 'Normal weight';
    } else if (this.bmiResult >= 25 && this.bmiResult < 29.9) {
      return 'Overweight';
    } else if (this.bmiResult >= 30 && this.bmiResult < 34.9) {
      return 'Obesity Class I (Moderate)';
    } else if (this.bmiResult >= 35 && this.bmiResult < 39.9) {
      return 'Obesity Class II (Severe)';
    } else if (this.bmiResult >= 40) {
      return 'Obesity Class III (Very Severe)';
    }

    return '';
  }
}
