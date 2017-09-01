import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAUfG-hBFcvLEGfgYLaMk46o3AJUuyTVKM'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
