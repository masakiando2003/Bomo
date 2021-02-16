package com.uniforce.bomo;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;

public class BomoMainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index2.html");
	}

	/*
	 * @Override protected void onPause() { // TODO Auto-generated method stub
	 * System.exit(0); super.onPause(); }
	 */

}
