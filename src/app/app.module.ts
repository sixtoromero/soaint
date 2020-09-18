import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import {AccordionModule} from 'primeng/accordion';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FileUploadModule} from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { VirtualScrollerModule } from 'primeng/virtualscroller'
import {TableModule} from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";

import { InterceptorService } from './interceptors/interceptor.service'

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule,
    RadioButtonModule,
    AccordionModule,
    InputSwitchModule,
    AutoCompleteModule,
    FileUploadModule,
    InputTextareaModule,
    CardModule,
    MessageModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    EditorModule,
    VirtualScrollerModule,
    NgxUiLoaderModule,
    InfiniteScrollModule,
    TableModule,
    ToolbarModule,
    NgxSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
