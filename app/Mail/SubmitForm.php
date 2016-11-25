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
    public function __construct($subject, $data, $files)
    {
        $this->subject = $subject;
        $this->data = $data;
        $this->files = $files;
        $this->words = [
            'first_name' => 'ชื่อจริง',
            'last_name' => 'นามสกุล',
            'nick_name' => 'ชื่อเล่น',
            'facebook' => 'Facebook',
            'instagram' => 'Instagram',
            'email' => 'E-Mail',
            'youtube' => 'Youtube Channel',
            'website' => 'Website',
            'lineID' => 'Line ID',
            'whatappID' => 'WhatApp ID',
            'phone' => 'เบอร์บ้าน',
            'mobile' => 'เบอร์มือถือ',
            'job' => 'อาชีพ',
            'interested_in' => 'สนใจทำอะไร',
            'interested_in_liposuction' => 'สนใจดูดใขมัน',
            'interested_in_other' => 'สนใจทำอื่นๆ',
            'medical_histories' => 'ประวัติการรักษาทางการแพทย์',
            'congenital_disease' => 'โรคประจำตัว',
            'current_medication' => 'ยาที่ใช้ปัจจุบัน',
            'allergic_symptoms' => 'อาการแพ้ยา',
            'need' => 'ความต้องการ',
            'note' => 'หมายเหตุ',
            'medical_histories[what]' => 'เคยทำอะไร',
            'medical_histories[where]' => 'ที่ไหน',
            'medical_histories[doctor]' => 'แพทย์',
            'medical_histories[duration]' => 'ระยะเวลา',
            'nose_surgery_history' => 'เคยทำศัลยกรรมจมูกมาก่อนหรือไม่',
            'ever_did_surgery_before_check' => 'เคยทำศัลยกรรมมาก่อนหรือไม่',
            'surgery_count_before' => 'ศัลยกรรมมาแล้วกี่ครั้ง',
            'surgeries_before' => 'เคยศัลยกรรมอะไร',
            'surgeries_before[how]' => 'ศัลยกรรมอะไร',
            'surgeries_before[where]' => 'ศัลยกรรมที่ไหน',
            'surgeries_before[duration]' => 'ระยะเวลา',
            'eye_surgery' => 'ศัลยกรรมรอบดวงตา',
            'beast_surgery_history' => 'เคยทำศัลยกรรมหน้าอกมาก่อนหรือไม่',
            'surgery_type' => 'รูปแบบการศัลยกรรม',
            'size' => 'ขนาด',
            'brand' => 'Brand',
            'place_or_doctor' => 'สถานที่ หรือ แพทย์',
            'duration' => 'ระยะเวลา',
            'activities' => 'กิจกรรม',
            'occupation' => 'งานประจำ',
            'type_implant' => 'รูปแบบการปลูกถ่าย',
            'any_children' => 'มีลูกแล้วหรือไม่',
            'child_age' => 'อายุของลูกคนล่าสุด',
            'child_count' => 'มีลูกทั้งหมดกี่คน',
            'surgery_history' => 'เคยทำศัลยกรรมมาก่อนหรือไม่',
            'before_know_details' => 'ทราบข้อมูลการศัลยกรรมหรือไม่',
            'count' => 'จำนวน',
            'last_time' => 'ครั้งล่าสุด',
            'volume' => 'ปริมาณ',
            'chin_surgery_history' => 'เคยทำศัลยกรรมคางมาก่อนหรือไม่',
            'eyebrow_issue' => 'ปัญหาที่พบ (ช่วงคิ้ว)',
            'eyebrow_issue_other' => 'ปัญหาที่พบ (ช่วงคิ้ว) อื่นๆ',
            'eyes_issue' => 'ปัญหาที่พบ (ช่วงตา)',
            'eyes_issue_other' => 'ปัญหาที่พบ (ช่วงตา) อื่นๆ',
            'wrinkle_issue' => 'ปัญหาที่พบ (ริ้วรอย)',
            'wrinkle_issue_other' => 'ปัญหาที่พบ (ริ้วรอย) อื่นๆ',
            'eye_tattoo' => 'สักตา',
            'eye_tattoo_other' => 'สักตา อื่นๆ',
            'vision_issue_short_check' => 'สายตาสั้น',
            'vision_issue_short' => 'สายตาสั้น เพิ่มเติม',
            'vision_issue_long_check' => 'สายตายาว',
            'vision_issue_long' => 'สายตายาว เพิ่มเติม',
            'vision_issue_astigmatism_check' => 'สายตาเอียง',
            'vision_issue_astigmatism' => 'สายตาเอียว เพิ่มเติม',
            'style_expectation' => 'รูปแบบที่คาดหวัง',
            'style_expectation_other' => 'รูปแบบที่คาดหวัง',
            'rating' => 'ความสวยงาม ณ ปัจจุบัน',
            'area_and_expect' => 'บริเวณที่ต้องการ และ ความคาดหวัง',
            'requesting_reasons' => 'เหตุผลที่ต้องการทำ',
            'before_surgeries' => 'ข้อซักถามก่อนทำศัลยกรรม',
            'chief_complaint' => 'Chief Complaint',
            'past_illness' => 'Past Illness',
            'present_illness' => 'Present Illness',
            'underlying_disease' => 'Underlying Disease',
            'current_medication_others' => 'Current Medication Others',
            'allergy_check' => 'Allergy Check',
            'allergy' => 'Allergy',
            'alcohol_check' => 'Alcohol Check',
            'alcohol' => 'Alcohol',
            'smoking_check' => 'Smoking Check',
            'smoking' => 'Smoking',
            'family_history_of_alopecia_check' => 'Family History of Alopecia Check',
            'family_history_of_alopecia' => 'Family History of Alopecia',
            'physical_exam_gender' => 'Physical Exam Gender',
            'physical_exam' => 'Physical Exam',
            'scalp' => 'Scalp',
            'quality_of_donor_hair' => 'Quality of Donor Hair',
            'elasticity' => 'Elasticity',
            'texture_of_the_hair' => 'Texture of the Hair',
            'color_of_the_hair' => 'Color of the Hair',
            'color_of_the_hair_other' => 'Color of the Hair Others',
            'donor' => 'Donor',
            'forehead_type' => 'รูปแบบหน้าผาก',
            'hip_type' => 'รูปแบบสะโพก',
            'body_type' => 'รูปแบบรูปร่าง',
            'liposuction_area' => 'บริเวณที่เอาไขมันออก',
            'histories' => 'ประวัติการทำศัลกรรม',
            'histories[area]' => 'บริเวณ',
            'histories[detail]' => 'รายละเอียด',
            'histories[how_long]' => 'นานแค่ไหน',
            'histories[problem]' => 'ปัญหาที่พบ',
            'please' => 'ความพึงพอใจ',
            'areas' => 'บริเวณ',
            'reasons' => 'เหตุผล',
            'questions' => 'คำถาม',
            'big_event' => 'ท่านมีงานสำคัญในปีนี้หรือไม่',
            'adviser' => 'บุคคลที่ท่านปรึกษาและแสดงความคิดเห้น ทั้งก่อนและหลังผ่าตัด',
            'filler_before_know_details' => 'ตำแหน่งที่ต้องการดูดไขมัน',
            'issues' => 'ปัญหา',
            'height' => 'ส่วนสูง',
            'weight' => 'น้ำหนัก',
            'bmi' => 'BMI',
            'filler_brand' => 'Filler (brand)',
            'filler_count' => 'กี่ครั้ง',
            'filler_last_time' => 'ครั้งล่าสุด',
            'filler_volume' => 'ปริมาณ',
            'filler_place_or_doctor' => 'สถานที่ หรือ แพทย์',
            'acknowledges' => 'ข้อควรทราบก่อนการผ่าตัด',
            'nose_conditions' => 'ภาวะจมูก',
            'personal_conditions' => 'ประวัติส่วนตัว'
        ];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mail = $this->view('emails.default');
        foreach($this->files as $key){
            if(is_array($key)){
                foreach($key as $file){
                    $mail->attach($file['path'], ['as'=>$file['name']]);
                }
            }else{
                $mail->attach($key['path'], ['as'=>$key['name']]);
            }
        }
        $mail->subject(sprintf('Submit Form: %s', title_case($this->subject)));
        return $mail->with(['data' => $this->data, 'words' => $this->words]);
    }
}
