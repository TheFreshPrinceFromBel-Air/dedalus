package com.dedalus.dedalus.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TextAnalyzerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testVowelCountingEndpoint() throws Exception {
        mockMvc.perform(post("/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "text": "Lorem ipsum dolor sit amet",
                                    "mode": "VOWELS"
                                }
                                """)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.O", is(3)))
                .andExpect(jsonPath("$.E", is(2)))
                .andExpect(jsonPath("$.I", is(2)))
                .andExpect(jsonPath("$.U", is(1)))
                .andExpect(jsonPath("$.A", is(1)));
    }
}