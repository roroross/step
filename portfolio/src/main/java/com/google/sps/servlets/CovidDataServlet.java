package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Key;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Scanner;

import com.google.sps.data.Comment; // TO BE EDITED FOR COMMENTS CLASS
import java.util.List;

/** Returns Covid data as a JSON object, e.g. {"2020-03-05": 52, "2020-09-08": 34}] */
@WebServlet("/Covid-data")
public class CovidDataServlet extends HttpServlet {
    //process the data and aggregate the data, so need to count it in a hashmap with a key and value
  private LinkedHashMap<String, Integer> TotalCovidCaseCount = new LinkedHashMap<>();

  @Override
  public void init() {
      //scanning our code from the csv
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream(
        "/WEB-INF/time_series_cases.csv"));
    while (scanner.hasNextLine()) {
      //processing one line at a time, so dont need a 2D array 
      //splitting the line with commas with every cell 
      String line = scanner.nextLine(); 
      String[] cells = line.split(",");

      String year = String.valueOf(cells[0]); //first column 
      Integer count = Integer.valueOf(cells[1]); //second column

      TotalCovidCaseCount.put(year, count);
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Gson gson = new Gson();
    String json = gson.toJson(TotalCovidCaseCount);
    response.getWriter().println(json);
  }
}