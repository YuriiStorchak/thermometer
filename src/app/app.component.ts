import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThermometerComponent } from '@shared/thermometer/thermometer.component';
import { Temperature } from '@shared/thermometer/thermometer.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ThermometerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public currentTemperature: Temperature;
  public maxTemperature: Temperature;
  public minTemperature: Temperature;
}
