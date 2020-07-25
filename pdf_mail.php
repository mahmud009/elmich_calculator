<?php
    require_once('fpdf/fpdf.php');
    require_once('fpdi/src/autoload.php');
    use setasign\Fpdi\Fpdi;



    $table_data = array(5,8,7,9,112,16,230,500,1100,12, 14);
    $base_data = array(129, 105, 118, "3%");
    $pdf_file_name = uniqid("pedestal_calculator_").".pdf";

    function generatePdf(){
        $pdf = new Fpdi();
        $pdf->AddPage();

        //Set the source PDF file
        $pagecount = $pdf->setSourceFile("pedestal_calculator_template.pdf");

        //Import the first page of the file
        $tpl = $pdf->importPage(1);
        //Use this page as template
        $pdf->useTemplate($tpl);
        $pdf->SetTextColor(138, 139, 142);
        $pdf->SetFont('Helvetica', "B");
        
        // Pedestal total
        $pdf->SetXY(33,70);
        $pdf->Write(0, $base_data[0]);

        // Area 
        $pdf->SetXY(30,82.3);
        $pdf->Write(0, $base_data[1]." m");
        
        // Short Height
        $pdf->SetXY(52,93.5);
        $pdf->Write(0, $base_data[2]." mm");

        // Slope Percentage
        $pdf->SetXY(57,104.5);
        $pdf->Write(0, $base_data[3]);

        // Table Update
        $pdf->SetFontSize(10);
        $col_start = 65.2;
        for($i = 0; $i < count($table_data); $i++){
            $pdf->SetXY(166.5, $col_start);
            $pdf->Cell(23, 8, $table_data[$i], 0, "", "C");
            $col_start += 8;
        }

        $pdf->Output($pdf_file_name, "F");
    }
?>