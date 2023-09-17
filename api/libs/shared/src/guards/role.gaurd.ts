import { CanActivate, ExecutionContext } from "@nestjs/common";

export class RoleGaurd implements CanActivate{
        private rolePassed:String


        constructor(role:string){
            this.rolePassed=role
        }
    canActivate(context: ExecutionContext)  {

              
        const ctx=context.switchToHttp();
        const request:any=ctx.getRequest();

        const response:any=ctx.getResponse();
        const user=request.user;
        console.log(user)
        console.log(response)
      
        console.log(this.rolePassed)

        return true;
           
        

        
    }

}