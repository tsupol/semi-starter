<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SubmitForm extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data, $files)
    {
        $this->data = $data;
        $this->files = $files;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mail = $this->view('emails.submit');
        foreach($this->files['face'] as $file){
            $mail->attach($file['path'], ['as'=>$file['name']]);
        }
        foreach($this->files['body'] as $file){
            $mail->attach($file['path'], ['as'=>$file['name']]);
        }
        foreach($this->files['normal'] as $file){
            $mail->attach($file['path'], ['as'=>$file['name']]);
        }
        return $mail->with(['data'=>$this->data, 'files'=>$this->files]);
    }
}
