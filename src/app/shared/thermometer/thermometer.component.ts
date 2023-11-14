import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  Signal,
  SimpleChanges,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

import { isNullOrUndefined, isNumber } from '@core/utils/utils';
import { EXTREMUM_PIVOT } from './thermometer.constant';
import { Temperature } from './thermometer.type';

@Component({
  selector: 'app-thermometer',
  standalone: true,
  templateUrl: './thermometer.component.html',
  styleUrl: './thermometer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThermometerComponent implements OnChanges {
  @Input({ required: true }) currentTemp: Temperature;
  @Input({ required: true }) minTemp: Temperature;
  @Input({ required: true }) maxTemp: Temperature;

  public isInputValid: WritableSignal<boolean> = signal(true);
  public isDisabled: Signal<boolean> = computed(
    () => !this.isDataEntered() || !this.isInputValid()
  );
  public rotation: WritableSignal<number | null> = signal(null);

  private isDataEntered = signal(false);

  ngOnChanges(changes: SimpleChanges) {
    const { currentTemp, minTemp, maxTemp } = changes;
    if (
      currentTemp?.currentValue !== currentTemp?.previousValue ||
      minTemp?.currentValue !== minTemp?.previousValue ||
      maxTemp?.currentValue !== maxTemp?.previousValue
    ) {
      this.checkInputValues();
    }
  }

  private checkInputValues(): void {
    this.isDataEntered.set(this.isAllTemperatureValuesEntered());
    this.isInputValid.set(this.isTemperatureValuesValid());
    if (this.isInputValid()) {
      this.calculateArrowRotation();
    }
  }

  private isAllTemperatureValuesEntered(): boolean {
    return (
      !isNullOrUndefined(this.currentTemp) &&
      !isNullOrUndefined(this.minTemp) &&
      !isNullOrUndefined(this.maxTemp)
    );
  }

  private isTemperatureValuesValid(): boolean {
    return this.isDataEntered()
      ? this.currentTemp! >= this.minTemp! && this.currentTemp! <= this.maxTemp!
      : true;
  }

  private calculateArrowRotation(): void {
    if (
      isNumber(this.currentTemp) &&
      isNumber(this.minTemp) &&
      isNumber(this.maxTemp)
    ) {
      const range = this.maxTemp - this.minTemp;
      const percentage = (this.currentTemp - this.minTemp) / range;
      this.rotation.set(percentage * EXTREMUM_PIVOT * 2 - EXTREMUM_PIVOT);
    }
  }
}
