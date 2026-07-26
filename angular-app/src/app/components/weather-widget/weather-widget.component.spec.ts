import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { WeatherWidgetComponent } from './weather-widget.component';
import { openMeteoUrl } from '../../lib/weather';

const openMeteoPayload = {
  current: {
    temperature_2m: 28.3,
    relative_humidity_2m: 74,
    apparent_temperature: 31.1,
    weather_code: 2,
    wind_speed_10m: 11.2,
  },
};

describe('WeatherWidgetComponent', () => {
  it('shows loading then live weather (panel)', async () => {
    const { fixture } = await render(WeatherWidgetComponent, {
      inputs: { variant: 'panel' },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const httpMock = fixture.debugElement.injector.get(HttpTestingController);

    expect(screen.getByText(/connecting to open-meteo/i)).toBeInTheDocument();

    const req = httpMock.expectOne(openMeteoUrl());
    req.flush(openMeteoPayload);

    await waitFor(() => {
      expect(screen.getByText('28°C')).toBeInTheDocument();
    });
    expect(screen.getByText(/partly cloudy/i)).toBeInTheDocument();
    expect(screen.getByText('74%')).toBeInTheDocument();
    expect(screen.getAllByText(/Jakarta/).length).toBeGreaterThan(0);

    httpMock.verify();
  });

  it('renders chip variant with compact command prompt', async () => {
    const { fixture } = await render(WeatherWidgetComponent, {
      inputs: { variant: 'chip' },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const httpMock = fixture.debugElement.injector.get(HttpTestingController);

    expect(screen.getByText(/\$ weather --jakarta/i)).toBeInTheDocument();

    httpMock.expectOne(openMeteoUrl()).flush(openMeteoPayload);

    await waitFor(() => {
      expect(screen.getByText('28°C')).toBeInTheDocument();
    });

    httpMock.verify();
  });

  it('shows error state and retries', async () => {
    const { fixture } = await render(WeatherWidgetComponent, {
      inputs: { variant: 'panel' },
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const httpMock = fixture.debugElement.injector.get(HttpTestingController);

    httpMock.expectOne(openMeteoUrl()).flush('server error', { status: 500, statusText: 'Internal Server Error' });

    await waitFor(() => {
      expect(screen.getByText(/http failure/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /retry/i }));

    httpMock.expectOne(openMeteoUrl()).flush(openMeteoPayload);

    await waitFor(() => {
      expect(screen.getByText('28°C')).toBeInTheDocument();
    });

    httpMock.verify();
  });
});
