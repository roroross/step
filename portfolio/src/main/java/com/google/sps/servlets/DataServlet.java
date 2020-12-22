// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

import java.util.ArrayList;

import com.google.sps.data.Comment; // TO BE EDITED FOR COMMENTS CLASS
import java.util.List;


/** Servlet that  handle and return comments data modify */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  //public static void main(String[] args) { 
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);
    
    String maxNumStr = request.getParameter("maxComments"); //returns as a string
    int maxNum = Integer.parseInt(maxNumStr); //convert str to int
    // /data?maxComments=5, that passes in "5" for the parameter "maxComments"

    List<Comment> comments = new ArrayList<>(); //-> make it at the top? an arraylist of commentclass
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId(); //id the the key 
      //in loop, get the properties that were set on each entity when it was stored in datastore
      String content = (String) entity.getProperty("content"); 
      long timestamp = (long) entity.getProperty("timestamp");
      String ipAddress = (String) entity.getProperty("ipAddress");

      //if it is over max size, stop adding comments in
      if (comments.size() >= maxNum) {
          break;
      } else {
          Comment newComments = new Comment(id, content, timestamp, ipAddress);
          comments.add(newComments);
      }
    }
    response.setContentType("application/json;"); //before other data is sent

    //sends the comments to the page, want it to be json, dont want it to be html. 
    //in the server, sending the comments data to the website page 
    // Convert the server  to JSON
    Gson gson = new Gson();
    String json = gson.toJson(comments);

    // Send the JSON as the response 
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    //use to send data to the server 

    //making a string called comment, getting it form the input 
    String comment = request.getParameter("text-input");
    long timestamp = System.currentTimeMillis();
    String ipAddress = request.getRemoteAddr();  

    //create new entity called of kind Comment, variable name commentEntity. 
    Entity commentEntity = new Entity("Comment");
    //set property of  a comment inside it.
    commentEntity.setProperty("content", comment);
    
    //ADD THE TIME STAMPES HEREEE AND IP ADDRESS HERE!!!!!!!!!!!!!!!!!!!
    commentEntity.setProperty("timestamp", timestamp);
    commentEntity.setProperty("ipAddress", ipAddress);

    //use datastore
    //store comment entity into  commentEntity. 
    datastore.put(commentEntity);


    //not quite sure if the next two lines of code is needed? as it works with and without it. 
    //setting the request as a text/html format
    response.setContentType("text/html");
    //puts stuff in it but rn is empty?
    response.getWriter().println();

    // Redirect back to the HTML page.
    response.sendRedirect("index.html");
  }
}