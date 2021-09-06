import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { RegistryComponent } from './registry/registry.component';
import {TableModule} from "primeng/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {TooltipModule} from "primeng/primeng";
import { AuthComponent } from './auth/auth.component';
import {NotebookService} from "./service/notebook.service";
import {AuthService} from "./service/auth.service";
import {AuthHttpInterceptor} from "./interceptor/auth-http.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    RegistryComponent,
    SafeHtmlPipe,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    TooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    NotebookService,
    AuthService,
    {provide:HTTP_INTERCEPTORS, useClass:AuthHttpInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
