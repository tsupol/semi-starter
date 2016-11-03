<?php

namespace App\Http\Controllers;

use File;
use Illuminate\Http\Request;

use App\Http\Requests;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $files = $request->file('files');
        $paths = [];
        $dir = 'upload';
        foreach($files as $file){
            $name = sprintf("%s.%s", hash('sha1', microtime(true)*10000), $file->extension());
            $file->move(public_path($dir), $name);
            $path = public_path($dir.'/'.$name);
            $paths[] = [
                'name' => $file->getClientOriginalName(),
                'url' => url($dir.'/'.$name),
                'serial' => bin2hex($path)
            ];
        }
        return response()->json(['files'=>$paths]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function deletePath(Request $request){
        $files = $request->get('files');
        $paths = [];
        foreach($files as $file){
            $paths[] = File::delete(hex2bin($file));
        }
        return response()->json(['files'=>$paths]);
    }
}
