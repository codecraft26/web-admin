import { CanActivate, ExecutionContext } from "@nestjs/common";

export class RoleGaurd implements CanActivate{
        private rolePassed:String


        constructor(private readonly allowedRoles:String[]){
            
        }
    canActivate(context: ExecutionContext)  {

       const {user}=context.switchToHttp().getRequest()
       if(!user){
              return false

       }
       
       return this.allowedRoles.includes(user.role)


        
    }

}