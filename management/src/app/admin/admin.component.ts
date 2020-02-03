import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userDetail = []
  filter_array = []
  update_id;
  constructor(private userservice: UserService) {

    // get user detail
    this.userservice.getUser().subscribe((res: any) => {
      if (res) {
        for (let i = 0; i < res.length; i++) {
          this.userDetail.push(res[i])
        }
      }
    })

  }
  toggle_val: boolean = true;

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    contact: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  get name() {
    return this.loginForm.get('name');
  }

  get contact() {
    return this.loginForm.get('contact');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.userservice.registerUser(this.loginForm.value).subscribe((res: any) => {
      console.log('login form', res);
    })
  }

  userDelete(id) {

    this.userservice.deleteUser(id).subscribe((res: any) => {
      console.log('user delete', res);
    })
  }

  userUpdate(id) {

    this.userDetail.forEach((value, index) => {
      if (value._id === id) {
        this.filter_array.push(value);

        // return value;

      }
    })
    this.loginForm.setValue({
      name: this.filter_array[0].name,
      contact: this.filter_array[0].contact,
      email: this.filter_array[0].email,
      password: this.filter_array[0].password
    });
    this.update_id = id;

  }

  modalClose(){
    this.loginForm.setValue({
      name: '',
      contact: '',
      email: '',
      password: ''
    });
  }
  onChange() {
    let update_data = {
      id:this.update_id,
      name : this.loginForm.value.name,
      email:this.loginForm.value.email,
      contact:this.loginForm.value.contact,
      password:this.loginForm.value.password
    }
    
    this.userservice.updateUser(update_data).subscribe((res: any) => {
      console.log('updateUser form', res);
    })
  }
  // side bar toggle
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    this.toggle_val = false;
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    this.toggle_val = true;
  }

  ngOnInit() {

  }

}
