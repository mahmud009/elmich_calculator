
Private Sub Worksheet_Calculate()
    Dim Xrg As Range
    Set Xrg = Range("A3:Q3")
    If Not Intersect(Xrg, Range("A3:Q3")) Is Nothing Then
'   Debug.Print ("range thingy working")
        
        Worksheets("VBA Data Paving").Range("A4:T1004").Clear
        Cornersonly_lengthwise_rownumbers
        Cornersonly_breadthwise_rownumbers
        Cornerscentre_lengthwise_rownumbers
        Cornerscentre_breadthwise_rownumbers
        Cornerscentreedges_lengthwise_rownumbers
        Cornerscentreedges_breadthwise_rownumbers
        
    End If
End Sub
Sub Cornersonly_lengthwise_rownumbers()
    Dim i As Integer, n As Long
    n = [a3]
    
    If IsNumeric(n) And n <> 0 Then
            
        For i = 1 To n
            Cells(i + 3, 1) = i
        Next i

        Call Cornersonly_lengthwise_rowheights

    End If
End Sub
Sub Cornersonly_lengthwise_rowheights()
    Dim i As Integer
    i = 1

    Do While Cells(i + 3, 1).Value <> ""
        Cells(i + 3, 2).Value = Round((Cells(i + 3, 1).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") + ThisWorkbook.Sheets("Overall").Range("AQ17") + 0.00001, 0)
        i = i + 1
    
    Loop
End Sub
Sub Cornersonly_breadthwise_rownumbers()
    Dim i As Integer, n As Long
    n = [c3]
    
    If IsNumeric(n) And n <> 0 Then
    
        For i = 1 To n
            Cells(i + 3, 3) = i
        Next i

        Call Cornersonly_breadthwise_rowheights
    
    End If
End Sub
Sub Cornersonly_breadthwise_rowheights()
    Dim i As Integer
    i = 1
    
    Do While Cells(i + 3, 3).Value <> ""
        Cells(i + 3, 4).Value = Round((Cells(i + 3, 3).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X23") + ThisWorkbook.Sheets("Overall").Range("AQ17") + 0.00001, 0)
        i = i + 1
    
    Loop
End Sub
Sub Cornerscentre_lengthwise_rownumbers()
    Dim i As Long, n As Long
    n = [E3]
    
    If n <> 0 Then
    
        For i = 1 To n - 1
            Cells(i + 3, 5) = i
            Cells(i + 3, 7) = i
        Next i
    
        Cells(n + 3, 5) = n
        Call Cornerscentre_lengthwise_rowheights
      
    End If
End Sub
Sub Cornerscentre_lengthwise_rowheights()
    Dim i As Integer
    i = 1
    
    Do While Cells(i + 3, 5).Value <> ""
        Cells(i + 3, 6).Value = Round((Cells(i + 3, 5).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") + ThisWorkbook.Sheets("Overall").Range("AQ17") + 0.00001, 0)
        i = i + 1
    
    Loop

    Dim j As Integer
    j = 1
    
    Do While Cells(j + 3, 7).Value <> ""
        Cells(j + 3, 8).Value = Round((Cells(j + 3, 7).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") + ThisWorkbook.Sheets("Overall").Range("AQ17") + (ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") / 2) + 0.00001, 0)
        j = j + 1
    
    Loop
End Sub
Sub Cornerscentre_breadthwise_rownumbers()
    Dim i As Long, n As Long
    n = [I3]
    
    If n <> 0 Then
    
        For i = 1 To n - 1
            Cells(i + 3, 9) = i
            Cells(i + 3, 11) = i
        Next i
    
        Cells(n + 3, 9) = n
        Call Cornerscentre_breadthwise_rowheights

    End If
End Sub
Sub Cornerscentre_breadthwise_rowheights()
    Dim i As Integer
    i = 1
    
    Do While Cells(i + 3, 9).Value <> ""
        Cells(i + 3, 10).Value = Round((Cells(i + 3, 9).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") + ThisWorkbook.Sheets("Overall").Range("AQ17") + 0.00001, 0)
        i = i + 1
    
    Loop

    Dim j As Integer
    j = 1
    
    Do While Cells(j + 3, 11).Value <> ""
        Cells(j + 3, 12).Value = Round((Cells(j + 3, 11).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") + ThisWorkbook.Sheets("Overall").Range("AQ17") + (ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") / 2) + 0.00001, 0)
        j = j + 1
    
    Loop
End Sub
Sub Cornerscentreedges_lengthwise_rownumbers()
    Dim i As Long, n As Long
    n = [M3]
    If n <> 0 Then
    
        For i = 1 To n
            Cells(i + 3, 13) = i
        Next i
        
        For i = 1 To (n - 1) / 2
            Cells(i + 3, 15) = i
        Next i
    
        Call Cornerscentreedges_lengthwise_rowheights
    
    End If
End Sub
Sub Cornerscentreedges_lengthwise_rowheights()
    Dim i As Integer
    i = 1
    
    Do While Cells(i + 3, 13).Value <> ""
        Cells(i + 3, 14).Value = Round((Cells(i + 3, 13).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") / 2 + ThisWorkbook.Sheets("Overall").Range("AQ17") + 0.00001, 0)
        i = i + 1
    
    Loop

    Dim j As Integer
    j = 1
    
    Do While Cells(j + 3, 15).Value <> ""
        Cells(j + 3, 16).Value = Round((Cells(j + 3, 15).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") + ThisWorkbook.Sheets("Overall").Range("AQ17") + (ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") / 2) + 0.00001, 0)
        j = j + 1
    
    Loop
End Sub
Sub Cornerscentreedges_breadthwise_rownumbers()
    Dim i As Long, n As Long
    n = [Q3]
    If n <> 0 Then
    
        For i = 1 To n
            Cells(i + 3, 17) = i
        Next i
        
        For i = 1 To (n - 1) / 2
            Cells(i + 3, 19) = i
        Next i
    
        Call Cornerscentreedges_breadthwise_rowheights
        
    End If
End Sub
Sub Cornerscentreedges_breadthwise_rowheights()
    Dim i As Integer
    i = 1
    
    Do While Cells(i + 3, 17).Value <> ""
        Cells(i + 3, 18).Value = Round((Cells(i + 3, 17).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") / 2 + ThisWorkbook.Sheets("Overall").Range("AQ17") + 0.00001, 0)
        i = i + 1
    
    Loop

    Dim j As Integer
    j = 1
    
    Do While Cells(j + 3, 19).Value <> ""
        Cells(j + 3, 20).Value = Round((Cells(j + 3, 19).Value - 1) * ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") + ThisWorkbook.Sheets("Overall").Range("AQ17") + (ThisWorkbook.Sheets("Overall").Range("AQ29") * ThisWorkbook.Sheets("Overall").Range("X20") / 2) + 0.00001, 0)
        j = j + 1
    
    Loop
End Sub
