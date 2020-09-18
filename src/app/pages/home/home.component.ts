import { Component, OnInit, ɵConsole, EventEmitter, Output } from '@angular/core';
import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';


import {LazyLoadEvent, SelectItem, MessageService, ConfirmationService} from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { DistributionService } from '../../services/distribution.service'
import { DistributionModel } from 'src/app/models/distribution.model';
//import { debug } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {
  
  items: DistributionModel[];
  selectedItems: DistributionModel;
  item = new DistributionModel();
  itemDialog: boolean;
  submitted: boolean;  
  isEdit: boolean;
  public itemsForm: FormGroup  = new FormGroup({});

  constructor(
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: DistributionService,
    private fb: FormBuilder) { 
      this.itemsForm = fb.group({
        title: ['', [Validators.required]],
        _about: ['', [Validators.required]],
        accessURL: ['', [Validators.required]]
      });      
    }

  ngOnInit(): void {
    this.isEdit = false;
    this.getdistribution();    

  }

  get f() {
    return this.itemsForm.controls;
  }

  getdistribution() {
    
    this.ngxService.start();

    this.service.getdistribution().subscribe(response => {      
      this.ngxService.stop();      
      this.items = response["result"].items as DistributionModel[];

      const register = JSON.parse(localStorage.getItem('register'));
      
      if (register === null) {
        localStorage.setItem('register', JSON.stringify(this.items));
      } else {        
        this.items = JSON.parse(localStorage.getItem('register')) as DistributionModel[];
      }

    });
  }  

  openNew() {
    this.item = new DistributionModel();
    this.submitted = false;
    this.itemDialog = true;
  }

  openEdit() {
    
    this.isEdit = true;
    this.item = this.selectedItems;    
    this.itemDialog = true;
    
  }

  deleteSelectedItem() {
    console.log('si entra');
    //console.log('selectedItems', this.selectedItems);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        const result = this.service.delete(this.selectedItems);

        if (result) {
          this.selectedItems = null;
          this.itemDialog = false;
          this.getdistribution();
          this.showSuccess('item Deleted');
        } else {
          this.showError('ha ocurrido un error');
        }

      }
    });
  }
  
  saveItem() {
    const result = this.service.insert(this.item);
    if (result) {
      this.selectedItems = null;
      this.itemDialog = false;
      this.getdistribution();
      this.showSuccess('item guardado exitosamente');      
    } else {
      this.showError('ha ocurrido un error');
    }
  }

  updateItem() {

    debugger;
    const result = this.service.update(this.selectedItems);
    
    if (result) {
      this.selectedItems = null;
      this.itemDialog = false;
      this.getdistribution();
      this.showSuccess('item actualizado exitosamente');      
    } else {
      this.showError('ha ocurrido un error');
    }
  }

  showSuccess(message: string) {
    this.messageService.add({severity:'success', summary: 'Bien hecho', detail: message});
  }

  showError(message: string) {
    this.messageService.add({severity:'error', summary: 'Algo no va bien', detail: message});
  }

}
