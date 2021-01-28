import { Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    // if (jwt) res.redirect('http://localhost:4200/login/success/' + jwt);

    console.log(req.user.profile.displayName);

    if (jwt)
      res
        // .redirect('http://localhost:4200/login/success/' + jwt)
        // .status(200)
        // .json({
        //   idToken: jwt,
        //   user: req.user.profile._json,
        // });
        // .cookie('idToken', jwt, { httpOnly: true, secure: true })
        .cookie('idToken', jwt)
        .cookie('profile', req.user.profile)
        .redirect('http://localhost:4200/login');
    else res.redirect('http://localhost:4200/login/failure');
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
