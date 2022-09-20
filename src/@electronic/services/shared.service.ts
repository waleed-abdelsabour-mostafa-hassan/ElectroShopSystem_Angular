import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptService } from './crypt.service';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  UserId:any;//="8bf682bf-f879-4c8b-883e-9cbd2e71a190";
  token:any;//="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjhiZjY4MmJmLWY4NzktNGM4Yi04ODNlLTljYmQyZTcxYTE5MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Im1vaGFtbWVkLmF0dGFsbGEyMDIxQGdtYWlsLmNvbSIsImp0aSI6IjUyNTA0ZDZkLTJkNmItNDRiNi04ZGFiLTAzNDY0ZjQzNDViZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2NjA2OTA3NDgsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzA5Ni8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvIn0.aXJNOTJJrhENS_w9D-zp7202E3rEP7MTZeghZySdPoc";
  headers_object:any;

  constructor(private crypt: CryptService) { 
    if (localStorage.getItem('token')) {
      var Token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );
      this.UserId = Token.id; 
      this.token=localStorage.getItem('token')
      this.headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.token);
  //}
}}}

