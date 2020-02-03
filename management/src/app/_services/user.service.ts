import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  is_admin;
  constructor(private http: HttpClient,private router: Router) { }
  // admin crud
  getUser() {
    
    return this.http.get(environment.api_endpoint + 'admin/userdata')
  }

  registerUser(value) {
    return this.http.post(environment.api_endpoint + 'register', value);
    
  }

  deleteUser(ids) {
    var userid = {
      id: ids
    }

    return this.http.post(environment.api_endpoint + 'admin/delete', userid);
  }

  updateUser(user) {
    return this.http.put(environment.api_endpoint + 'admin/update', user);
  }

  socialLogin() {
     return this.http.get(environment.api_endpoint + 'google')
  }

  // user crud
  userLogin(value) {
    
    this.http.post(environment.api_endpoint + 'login', value)
      .pipe(
        map(res => res)
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.data && res.data.body.usertoken) {
          localStorage.setItem('token', res.data.body.usertoken)
          this.router.navigate(['']);
          if(res.data.body.userRole &&  res.data.body.userRole[0] == "admin" ){
            this.is_admin = true;
          }else{
            this.is_admin = false;
          }
        }
      })
     
  }

   adminAccess(){
     if(this.is_admin == true){
       return true;
     }
     else{return false;}
   }
  userRegister(newuser) {
    
    return this.http.post(environment.api_endpoint + 'register', newuser);
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    
  }
 //check is user logged in 
 logged_in()
 {
   return localStorage.getItem("token");
 }
  

}
