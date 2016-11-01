<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use BF;
use Input;
use Validator;
use Auth;
use Session;
use \Firebase\JWT\JWT;
use Illuminate\Http\Request;

class JWTAuthController extends Controller
{
    public function login(Request $request)
    {
        //sleep(1);
        $input = BF::decodeInput($request->getContent());
        $rules = array(
            'username' => 'required',
            'password' => 'required|min:3'
        );
        $validator = Validator::make($input, $rules);
        if ($validator->fails()) {
            return BF::result(false, $validator->messages()->first());
        } else {
            $username = $input['username'] ;
            $password = $input['password'] ;
            if (!preg_match("/@/", $username)) {
                $search_column = 'username';
            } else {
                $search_column = 'email';
            }

            if (Auth::attempt([$search_column => $username, 'password' => $password], Input::has('remember'))) {
                $userId = Auth::user()->id;
                $domain = $_SERVER['HTTP_HOST'];
                $today = Carbon::today()->timestamp ;
                $tomorrow = Carbon::tomorrow()->timestamp ;
                $token = array(
                    "iss" => $domain,
                    "aud" => $domain,
                    "iat" => $today,
                    "exp" => $tomorrow,
                    'id' => $userId
                );

                $jwt = JWT::encode($token, getenv('APP_KEY'));
                $data = [
                    "token" => $jwt,
                    // todo: user information here
                    "user" => [
                        "permissions" => Auth::user()->getAllPermissions(),
                        "roles" => Auth::user()->getAllRoles(),
                        "id" => Auth::user()->id,
                        "branch" => Auth::user()->branch
                    ]
                ];
                return BF::result(true, $data, 'login');
            } else {
                return BF::result(false, "Error!! Username or Password Incorrect. \nPlease try again.");
            }

        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        Session::flush();
        return BF::result(true, "", 'Logout');
    }

    public function changePassword(Request $request)
    {
        $input = BF::decodeInput($request);
        $rules = array(
            'oldPass' => 'required|alphaNum|min:3',
            'newPass' => 'required|alphaNum|min:3',
            'confirmPass' => 'required|alphaNum|min:3',
        );
        $validator = Validator::make($input, $rules);
        if ($validator->fails()) {
            return BF::result(false, $validator->messages()->first());
        } else {
            $data = [];
            $data['oldPass'] = $input['oldPass'] ;
            $data['newPass'] = $input['newPass'] ;
            $data['confirmPass'] = $input['confirmPass'] ;
            return BF::result(true, $data, 'ChangePass');
        }
    }

}
