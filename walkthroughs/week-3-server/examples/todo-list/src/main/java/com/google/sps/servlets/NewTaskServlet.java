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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for creating new tasks. */
@WebServlet("/new-task")
public class NewTaskServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String title = request.getParameter("title");
    long timestamp = System.currentTimeMillis();

    //creating a new entity by giving it a "kind" (aka a category) of task (aka the cateogry is Task)
    //and store it in a taskEntity variable (the variable name is taskEntity)
    Entity taskEntity = new Entity("Task");

    //setting 2 properties in the taskEntity entity, title, and timestamp
    taskEntity.setProperty("title", title);
    taskEntity.setProperty("timestamp", timestamp);

    //to use datastore, need an instance of the datastore class. 
    //it comes with the app engine so no need for prior custom class define
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    //now i have a datastore variable, and task entity variable.
    //store the entity by passing it into the datastore.put() function.
    //this stores taskentity in datastore so i can load it next time i need it.
    datastore.put(taskEntity);
    
    response.sendRedirect("/index.html");
  }
}