<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\ImageManagerStatic as Image;
use phpDocumentor\Reflection\File;

class UploadController extends Controller
{
    public function putAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $image = $request->file('avatar');
        $name = time() . '.' . ($image->getClientOriginalExtension());
        $image_resize = Image::make($image->getRealPath());
        $image_resize->resize(70, 70);
        $image_resize->save(public_path('storage/users/' . ($request->user()->id) . '/' . $name));
        $request->user()->avatar = '/storage/users/' . ($request->user()->id) . '/' . $name;
        $request->user()->save();
        return $this->sendResponse(['avatar' => $request->user()->avatar], 'Success', 200);
    }

    public static function uploadImage($image, $directory)
    {
        $name=time() . '-' . uniqid() .'.jpg';
        $image_resize = Image::make($image->getRealPath());
        $image_resize->resize(null,400, function ($constraint) {
            $constraint->aspectRatio();
        });
        $image_resize->encode('jpg')->save(public_path($directory) . $name);
        return $directory . $name;
    }

    public function putImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $image = $request->file('image');
        $image = self::uploadImage($image,'storage/images/');
        return $this->sendResponse(['image' => $image], 'Success', 200);
    }
}
