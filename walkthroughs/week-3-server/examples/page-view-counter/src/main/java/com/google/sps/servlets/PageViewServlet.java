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

/** Servlet that returns HTML that contains the page view count. */
// @webservlet is an annotation that tells our server which UTL this ervlet maps to
//when client requests the pageviews URL, this servlet is triggered
//@WebServlet("/content")

@WebServlet("/page-views") 
public class PageViewServlet extends HttpServlet {

  private int pageViews = 0;
  //do get function below runs whenever a client sends a GET request to the servlet URL
  //aka browser seds a GET request whenever I visit a URL
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    pageViews++;
    //^ since the doget function runs everytime the pageviews URL is requested, 
    //this means the pageviews variable tracks how many times the page has been viewed

    /*
    response.setContentType("text/html;") - specifies what type of content the client should expect
    response.getWriter().println("<h1>Page Views</h1>")-  prints an <h1> tag to the response.
    response.getWriter().println("<p>This page has been viewed " + pageViews + " times.</p>"); prints the page view count to the response.
    */
    response.setContentType("text/html;");
    response.getWriter().println("<h1>Page Views</h1>");
    response.getWriter().println("<p>This page has been viewed " + pageViews + " times.</p>");
  }
}
