import { AppConfigService } from "@/@core/app-config";
import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { TOKEN_TYPE } from "../constants";

export class WebhookGuard implements CanActivate {
  constructor(@Inject(AppConfigService) private readonly appConfigService: AppConfigService){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(req: Request): boolean {
    if(!req) {
      throw new Error('Authentication error');
    }

    const apiKey = this.appConfigService.strapi.webhookToken.trim();
    const token = `${TOKEN_TYPE} ${apiKey}`
    if((req.headers as {authorization?: string}).authorization !== token){
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}