package com.appnetworking.wahaj.healthmoniteringapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class Screen1Activity extends AppCompatActivity {

     public static TextView resText;
    Button scanButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.screen1);

    resText =(TextView) findViewById(R.id.result);
    scanButton=(Button) findViewById(R.id.scan);

    scanButton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {

            //startActivity(new Intent(getApplicationContext(), activity_scan_code.class));
        startActivity(new Intent(Screen1Activity.this, ScanCode.class));

        }
    });
    }
}
